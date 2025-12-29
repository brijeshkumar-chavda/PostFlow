using Microsoft.EntityFrameworkCore;
using CrossPlatformPostApp.Server.Models;

namespace CrossPlatformPostApp.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<SocialAccount> SocialAccounts { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<MediaAsset> MediaAssets { get; set; }
    public DbSet<PostTarget> PostTargets { get; set; }

    public DbSet<UserUsage> UserUsages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Enums as strings or custom mapping if needed
        // For now, simpler to leave them as strings in C# (as defined in Models) and EF will map to text/varchar
        
        // Relationships are mostly handled by convention, but explicit config helps

        // User -> SocialAccounts
        modelBuilder.Entity<User>()
            .HasMany(u => u.SocialAccounts)
            .WithOne(sa => sa.User)
            .HasForeignKey(sa => sa.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // User -> Posts
        // modelBuilder.Entity<User>()
        //     .HasMany(u => u.Posts)
        //     .WithOne(p => p.User)
        //     .HasForeignKey(p => p.UserId)
        //     .OnDelete(DeleteBehavior.Cascade);

        // Post -> PostTargets
        modelBuilder.Entity<Post>()
            .HasMany(p => p.PostTargets)
            .WithOne(pt => pt.Post)
            .HasForeignKey(pt => pt.PostId)
            .OnDelete(DeleteBehavior.Cascade);

        // SocialAccount -> PostTargets
        modelBuilder.Entity<SocialAccount>()
            .HasMany(sa => sa.PostTargets)
            .WithOne(pt => pt.SocialAccount)
            .HasForeignKey(pt => pt.SocialAccountId)
            .OnDelete(DeleteBehavior.Restrict);

        // User -> MediaAssets
        // modelBuilder.Entity<User>()
        //     .HasMany(u => u.MediaAssets)
        //     .WithOne(ma => ma.User)
        //     .HasForeignKey(ma => ma.UserId)
        //     .OnDelete(DeleteBehavior.Cascade);
            
        // Post -> MediaAssets (Optional relationship)
        modelBuilder.Entity<MediaAsset>()
            .HasOne(ma => ma.Post)
            .WithMany(p => p.MediaAssets)
            .HasForeignKey(ma => ma.PostId)
            .OnDelete(DeleteBehavior.SetNull);

        // User -> UserUsage (1:1)
        modelBuilder.Entity<User>()
            .HasOne(u => u.UserUsage)
            .WithOne(uu => uu.User)
            .HasForeignKey<UserUsage>(uu => uu.UserId);
    }
}
