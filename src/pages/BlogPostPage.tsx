import React from 'react';
import { Clock, ArrowLeft, Share2, Sparkles, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import { useShop } from '../context/ShopContext';

export const BlogPostPage: React.FC = () => {
  const { viewParams, navigate, showToast } = useShop();
  const slug = viewParams?.slug;

  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];
  const relatedArticles = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('blog')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2D4628] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Guides
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 px-4 bg-white rounded-full border border-[#EEDCC6] text-[#2D4628] hover:text-[#D97706] shadow-xs flex items-center gap-1.5 text-xs font-semibold"
          >
            <Share2 className="w-4 h-4" /> Share Article
          </button>
        </div>

        {/* Main Article Container */}
        <article className="bg-white rounded-[2.5rem] border border-[#EEDCC6] shadow-xl overflow-hidden p-6 sm:p-12 mb-12 space-y-8">
          
          {/* Header Info */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#FAF5EE] border border-[#EEDCC6] text-[#2D4628] px-3.5 py-1 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{post.category}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2D4628] leading-snug">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-stone-500 pt-2 border-t border-[#EEDCC6]/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2D4628] text-white flex items-center justify-center font-bold text-xs">
                  {post.author.name[0]}
                </div>
                <div>
                  <span className="font-bold text-[#2D4628] block">{post.author.name}</span>
                  <span className="text-[10px] text-stone-400">{post.author.role}</span>
                </div>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" /> {post.readTime}
              </span>
              <span>•</span>
              <span>Published {post.publishedDate}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-16/9 rounded-[2rem] overflow-hidden bg-[#FAF5EE] border border-[#EEDCC6]">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Excerpt Callout */}
          <div className="p-4 sm:p-6 bg-[#FAF5EE] border-l-4 border-[#2D4628] rounded-r-2xl text-xs sm:text-sm text-[#2D4628] font-medium italic leading-relaxed">
            "{post.excerpt}"
          </div>

          {/* Article Body Content */}
          <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed text-stone-700 space-y-4">
            {post.content.split('\n\n').map((para, idx) => {
              if (para.startsWith('## ')) {
                return (
                  <h2 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-[#2D4628] pt-4 pb-1">
                    {para.replace('## ', '')}
                  </h2>
                );
              }
              if (para.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-serif text-base sm:text-lg font-bold text-[#2D4628] pt-3">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('* ') || para.startsWith('- ')) {
                return (
                  <div key={idx} className="pl-4 py-1 text-stone-700 font-medium border-l-2 border-[#D97706]">
                    {para.replace(/^[*-]\s/, '')}
                  </div>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-[#EEDCC6]/50 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-[#2D4628] mr-1" />
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-semibold text-[#2D4628] bg-[#FAF5EE] border border-[#EEDCC6] px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

        </article>

        {/* Related Articles Strip */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#2D4628]">Recommended Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate('blog-post', { slug: rel.slug })}
                className="bg-white p-5 rounded-[2rem] border border-[#EEDCC6] hover:border-[#2D4628] shadow-xs cursor-pointer flex gap-4 items-center group transition-all"
              >
                <img src={rel.coverImage} alt={rel.title} className="w-20 h-20 rounded-2xl object-cover shrink-0 bg-[#FAF5EE]" />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-[#D97706] uppercase block">{rel.category}</span>
                  <h4 className="font-serif font-bold text-sm text-[#2D4628] group-hover:text-[#D97706] truncate">
                    {rel.title}
                  </h4>
                  <span className="text-[11px] text-stone-400 mt-1 block">{rel.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
