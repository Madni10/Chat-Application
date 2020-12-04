using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace webAPI.Entities
{
    public partial class chatAppDBContext : DbContext
    {
        public chatAppDBContext()
        {
        }

        public chatAppDBContext(DbContextOptions<chatAppDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Friends> Friends { get; set; }
        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=HOME1;Database=chatAppDB;Trusted_Connection=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Friends>(entity =>
            {
                entity.HasOne(d => d.Friendone)
                    .WithMany(p => p.FriendsFriendone)
                    .HasForeignKey(d => d.FriendOneId)
                    .HasConstraintName("FK__Friends__FRIENDO__267ABA7A");

                entity.HasOne(d => d.Friendtwo)
                    .WithMany(p => p.FriendsFriendtwo)
                    .HasForeignKey(d => d.FriendTwoId)
                    .HasConstraintName("FK__Friends__FRIENDT__276EDEB3");
            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasOne(d => d.Receiver)
                    .WithMany(p => p.MessageReceiver)
                    .HasForeignKey(d => d.ReceiverId)
                    .HasConstraintName("FK__Message__RECEIVE__2B3F6F97");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.MessageSender)
                    .HasForeignKey(d => d.SenderId)
                    .HasConstraintName("FK__Message__SENDERI__2A4B4B5E");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.Password).IsUnicode(false);

                entity.Property(e => e.Username).IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
