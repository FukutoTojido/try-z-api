using TryZ_API.Routes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

var app = builder.Build();
app.UseHttpsRedirection();

app.SetupUsersEndpoints();
app.SetupBeatmapsEndpoints();
app.Run();
