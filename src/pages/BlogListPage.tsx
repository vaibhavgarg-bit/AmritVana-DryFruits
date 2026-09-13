import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import { useShop } from '../context/ShopContext';

export const BlogListPage: React.FC = () => {
  const { navigate } = useShop();
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', 'Almond Guides', 'Cashew Grading', 'Dates & Nutrition', 'Ayurveda & Health', 'Gifting & Lifestyle'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedTag !== 'all' && post.category !== selectedTag) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold">Nutrition & Buying Guides</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#FAF5EE] border border-[#EEDCC6] text-[#2D4628] px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
            <span>THE AMRITVANA KNOWLEDGE REPOSITORY</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D4628]">
            Dry Fruit Health & Sourcing Guides
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Discover authentic grading knowledge, ayurvedic morning rituals, nutritional science, and buying tips from our master roasters and nutritionists.
          </p>
        </div>

        {/* Filter Tags & Search */}
        <div className="bg-white p-4 rounded-[2rem] border border-[#EEDCC6] shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTag(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedTag === cat
                    ? 'bg-[#2D4628] text-white shadow-xs'
                    : 'bg-[#FAF5EE] border border-[#EEDCC6] text-[#2D4628] hover:bg-[#F5EFE7]'
                }`}
              >
                {cat === 'all' ? 'All Guides' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-2.5" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-3 py-2 text-xs bg-[#FAF5EE] border border-[#EEDCC6] rounded-full focus:outline-hidden focus:border-[#2D4628] text-[#2D4628]"
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate('blog-post', { slug: post.slug })}
              className="bg-white rounded-[2rem] overflow-hidden border border-[#EEDCC6] shadow-xs hover:shadow-xl hover:border-[#2D4628] transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-[#FAF5EE]">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-[#2D4628] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" /> {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.publishedDate}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#2D4628] group-hover:text-[#D97706] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold text-[#2D4628] bg-[#FAF5EE] border border-[#EEDCC6] px-2.5 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#EEDCC6]/50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#FAF5EE] text-[#2D4628] border border-[#EEDCC6] flex items-center justify-center font-bold text-[10px]">
                      {post.author.name[0]}
                    </div>
                    <span className="font-medium text-stone-700">{post.author.name}</span>
                  </div>
                  <span className="font-bold text-[#D97706] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
