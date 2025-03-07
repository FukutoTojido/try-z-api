namespace TryZ_API.Routes;

using System.Web;
using HtmlAgilityPack;
using Newtonsoft.Json;

public static class Users
{
    private static string GetUsers(string id)
    {
        var web = new HtmlWeb();
        var document = web.Load($"https://osu.ppy.sh/users/{id}");
        var raw = document.DocumentNode.QuerySelector(".js-react--profile-page.u-contents")
            ?.GetAttributeValue("data-initial-data", "{}");
        return HttpUtility.HtmlDecode(raw ?? string.Empty);
    }

    private static IResult GetAvatar(string id)
    {
        var user = GetUsers(id);
        if (user == string.Empty) return Results.NotFound();
        
        var json = JsonConvert.DeserializeObject<dynamic>(user);
        return (string?)json?.user?.avatar_url != null
            ? Results.Redirect((string)json.user.avatar_url)
            : Results.NotFound();
    }

    private static IResult ReturnUser(string id)
    {
        var user = GetUsers(id);
        return user != string.Empty ? Results.Text(user, contentType: "application/json") : Results.NotFound();
    }

    public static void SetupUsersEndpoints(this WebApplication app)
    {
        app.MapGet("/users/{id}", ReturnUser);
        app.MapGet("/u/{id}", ReturnUser);
        app.MapGet("/avatars/{id}", GetAvatar);
        app.MapGet("/a/{id}", GetAvatar);
    }
}