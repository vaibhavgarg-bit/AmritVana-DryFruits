import React from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogs';
import { useShop } from '../../context/ShopContext';

export const BlogPreview: React.FC = () => {
  const { navigate } = useShop();

  return (
    <section className="py-16 sm:py-20 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D97706] mb-1">
              <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
              <span>THE AMRITVANA KNOWLEDGE VAULT</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D4628]">
              Dry Fruit Health & Buying Guides
            </h2>
          </div>

          <button
            onClick={() => navigate('blog')}
            className="text-xs sm:text-sm font-bold text-[#D97706] hover:text-[#B45309] flex items-center gap-1 hover:underline"
          >
            Read All Articles →
          </button>
        </div>

        {/* Blog Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => navigate('blog-post', { slug: post.slug })}
              className="bg-white rounded-3xl overflow-hidden border border-[#EEDCC6] hover:border-[#D97706]/70 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-[#F5EFE7]">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#2D4628] text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                    {post.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" /> {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.publishedDate}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#2D4628] group-hover:text-[#D97706] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-[#EEDCC6]/50 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2D4628]">{post.author.name}</span>
                  <span className="font-bold text-[#D97706] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
