using Microsoft.AspNetCore.Http.HttpResults;

namespace TryZ_API.Routes;

using System.Web;
using HtmlAgilityPack;

public static class Beatmaps
{
    private static string GetBeatmap(int id)
    {
        var web = new HtmlWeb();
        var document = web.Load($"https://osu.ppy.sh/b/{id}");
        var raw = document.DocumentNode.QuerySelector("#json-beatmapset")
            .InnerText;
        return HttpUtility.HtmlDecode(raw);
    }

    private static string GetBeatmapSet(int id)
    {
        var web = new HtmlWeb();
        var document = web.Load($"https://osu.ppy.sh/s/{id}");
        var raw = document.DocumentNode.QuerySelector("#json-beatmapset")
            .InnerText;
        return HttpUtility.HtmlDecode(raw);
    }

    private static async Task<IResult> GetOsu(int id)
    {
        var url = $"https://osu.ppy.sh/osu/{id}";
        try
        {
            using var client = new HttpClient();
            using var response = await client.GetAsync(url);
            using var content = response.Content;
            var data = await content.ReadAsStringAsync();
            return Results.Ok(data);
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine(e);
            return Results.NotFound();
        }
    }

    public static void SetupBeatmapsEndpoints(this WebApplication app)
    {
        app.MapGet("/beatmaps/{id:int}", GetBeatmap);
        app.MapGet("/b/{id:int}", GetBeatmap);
        app.MapGet("/beatmapsets/{id:int}", GetBeatmapSet);
        app.MapGet("/s/{id:int}", GetBeatmapSet);
        app.MapGet("/beatmaps/{id:int}/osu", GetOsu);
        app.MapGet("/b/{id:int}/osu", GetOsu);
    }
}