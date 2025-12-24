namespace CrossPlatformPostApp.Server.DTOs;

public class CreatePostDto
{
    public string Content { get; set; } = string.Empty;
    public string Status { get; set; } = "draft";
    public DateTime? ScheduledTime { get; set; }
    public int UserId { get; set; }
    public List<int> MediaAssetIds { get; set; } = new();
}
