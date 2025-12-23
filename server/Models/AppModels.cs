using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrossPlatformPostApp.Server.Models;

public class User
{
    public int Id { get; set; }
    
    [Required]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string Name { get; set; } = string.Empty;
    
    public string PasswordHash { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public List<SocialAccount> SocialAccounts { get; set; } = new();
    public List<Post> Posts { get; set; } = new();
    public List<MediaAsset> MediaAssets { get; set; } = new();
    public UserUsage? UserUsage { get; set; }
}

public class SocialAccount
{
    public int Id { get; set; }
    public int UserId { get; set; }
    
    [Required]
    public string Platform { get; set; } = string.Empty; // linkedin, instagram, twitter
    
    public string PlatformUserId { get; set; } = string.Empty;
    public string AccessToken { get; set; } = string.Empty;
    public string? RefreshToken { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public DateTime ConnectedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public List<PostTarget> PostTargets { get; set; } = new();
}

public class Post
{
    public int Id { get; set; }
    public int UserId { get; set; }
    
    public string Content { get; set; } = string.Empty;
    public string Status { get; set; } = "draft"; // draft, scheduled, published
    
    public DateTime? ScheduledTime { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public string? AiContextSource { get; set; }

    public User User { get; set; } = null!;
    public List<PostTarget> PostTargets { get; set; } = new();
    public List<MediaAsset> MediaAssets { get; set; } = new();
}

public class MediaAsset
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int? PostId { get; set; }
    
    [Required]
    public string Url { get; set; } = string.Empty;
    public string Type { get; set; } = "image"; // image, video
    public string Filename { get; set; } = string.Empty;
    public int SizeBytes { get; set; }
    
    // AI Fields
    public string? Prompt { get; set; }
    public string? AiModel { get; set; }
    public bool IsGenerated { get; set; } = false;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public Post? Post { get; set; }
}

public class PostTarget
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public int SocialAccountId { get; set; }
    
    public string Status { get; set; } = "pending"; // pending, success, failed
    public string? ExternalPostId { get; set; }
    public string? ErrorMessage { get; set; }

    public Post Post { get; set; } = null!;
    public SocialAccount SocialAccount { get; set; } = null!;
    public List<Analytics> Analytics { get; set; } = new();
}

public class Analytics
{
    public int Id { get; set; }
    public int PostTargetId { get; set; }
    
    public int Impressions { get; set; }
    public int Likes { get; set; }
    public int Comments { get; set; }
    public int Shares { get; set; }
    
    public DateTime FetchedAt { get; set; } = DateTime.UtcNow;

    public PostTarget PostTarget { get; set; } = null!;
}

public class UserUsage
{
    public int Id { get; set; }
    public int UserId { get; set; }
    
    public int ImageGenerationsCount { get; set; }
    public int TextGenerationsCount { get; set; }
    public DateTime CycleStartDate { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
}
