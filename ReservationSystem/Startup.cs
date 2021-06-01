using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ReservationSystem.Core;
using ReservationSystem.Core.repositories;
using ReservationSystem.Core.services;
using ReservationSystem.filters;
using System;
using FluentValidation.AspNetCore;
using ReservationSystem.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ReservationSystem.Core.Services;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace ReservationSystem
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options => {
                options.Filters.Add<ValidationFilter>();
            }
                ).AddFluentValidation(configuration => configuration.RegisterValidatorsFromAssemblyContaining<Startup>());

            services.AddSingleton<IDBClient, DBClient>();
            services.Configure<ReservationSystemDBConfig>(Configuration);
            services.AddTransient<IGamesService, GamesService>();
            services.AddTransient<ITablesService, TablesService>();
            services.AddTransient<IWorkDaysService, WorkDaysService>();
            services.AddTransient<IAccountsService, AccountsService>();
            services.AddTransient<IReservationsService, ReservationsService>();
            services.AddTransient<IIntervalsForWorkDaysService, IntervalsForWorkDaysService>();
            services.AddTransient<ISystemRolesService, SystemRolesService>();
            services.AddTransient<IPaymentService, PaymentService>();
            services.AddTransient<IPaymentRepository, PaymentRepository>();
            services.AddTransient<IGamesRepository, GamesRepository>();
            services.AddTransient<ITablesRepository, TablesRepository>();
            services.AddTransient<IWorkDaysRepository, WorkDaysRepository>();
            services.AddTransient<IAccountsRepository, AccountsRepository>();
            services.AddTransient<IReservationsRepository, ReservationsRepository>();
            services.AddTransient<IIntervalsForWorkDaysRepository, IntervalsForWorkDaysRepository>();
            services.AddTransient<ISystemRolesRepository, SystemRolesRepository>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddControllers();
         
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<UniqueClientAccountValidationFilter>();

            var jwtSettings = new JwtSettings();
            Configuration.Bind(nameof(jwtSettings), jwtSettings);
            services.AddSingleton(jwtSettings);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(x =>
                {
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.Secret)),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        RequireExpirationTime = false,
                        ValidateLifetime = true
                    };
                });

            services.AddAuthorization();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ReservationSystem", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ReservationSystem v1"));
            }

            //app.UseHttpsRedirection();
            app.UseCors(builder =>
            {
                builder.WithOrigins("http://localhost:3000");
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
            });

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images")),
                RequestPath = "/Images"
            }); 

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
