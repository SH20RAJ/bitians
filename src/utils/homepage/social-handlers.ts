'use client';

export function handleHashtagClick(hashtag: string): void {
  // Navigate to hashtag page
  window.location.href = `/hashtags/${hashtag}`;
}

export function handleMentionClick(mention: string): void {
  // Navigate to user profile
  window.location.href = `/profile/${mention}`;
}

export function handleSharePost(postId: string): void {
  // Share functionality
  if (navigator.share) {
    navigator.share({
      title: 'Check out this post on BITians',
      url: `${window.location.origin}/post/${postId}`,
    });
  } else {
    // Fallback to clipboard
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
  }
}

export function handleReportPost(postId: string): void {
  // Report functionality
  console.log('Reporting post:', postId);
  // Could open a modal or navigate to report page
}
