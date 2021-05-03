using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ReservationSystem.Core;
using ReservationSystem.Core.services;

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
            services.AddSingleton<IDBClient, DBClient>();
            services.Configure<ReservationSystemDBConfig>(Configuration);
            services.AddTransient<IGamesService, GamesService>();
            services.AddTransient<ITablesService, TablesService>();
            services.AddTransient<IWorksDaysService, WorkDaysService>();
            services.AddTransient<IAccountsRepository, AccountsService>();
            services.AddTransient<IReservationsService, ReservationsService>();
            services.AddTransient<IIntervalsForWorkDaysService, IntervalsForWorkDaysService>();
            services.AddTransient<ISystemRolesService, SystemRolesService>();
            services.AddTransient<IPaymentService, PaymentService>();
            services.AddControllers();
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

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
