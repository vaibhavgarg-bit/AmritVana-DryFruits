import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart, formatPrice, navigate, showToast } = useShop();

  const handleMoveToCart = (item: typeof wishlist[0]) => {
    addToCart(item.product, item.selectedWeight, 1);
    removeFromWishlist(item.product.id);
    showToast(`Moved ${item.product.name} to cart!`, 'success');
  };

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold">My Wishlist</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#EEDCC6] mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#2D4628] flex items-center gap-3">
              <Heart className="w-7 h-7 text-[#D97706] fill-[#D97706]" />
              <span>Saved Items & Wishlist</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              You have {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved in your wishlist.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={() => navigate('shop')}
              className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1"
            >
              Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Wishlist Grid / Empty State */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-16 text-center border border-[#EEDCC6] shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-20 h-20 bg-[#FAF5EE] text-[#D97706] border border-[#EEDCC6] rounded-full flex items-center justify-center mx-auto text-3xl">
              🤍
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2D4628]">Your wishlist is empty</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Explore our imperial harvest of Kashmiri Mamra Almonds, W180 Cashews, and handcrafted festive hampers and save your favorites!
            </p>
            <button
              onClick={() => navigate('shop')}
              className="px-8 py-3.5 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs font-bold shadow-md transition-all active:scale-95"
            >
              Explore Products Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => {
              const opt = item.product.weightOptions.find((w) => w.weight === item.selectedWeight) || item.product.weightOptions[0];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-[2rem] border border-[#EEDCC6] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#2D4628] transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-[#FAF5EE]">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover" 
                      />
                      <button
                        onClick={() => removeFromWishlist(item.product.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-rose-600 border border-[#EEDCC6] shadow-xs transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <span className="text-[11px] font-semibold text-[#2D4628] bg-[#FAF5EE] border border-[#EEDCC6] px-2.5 py-0.5 rounded-full">
                        {item.selectedWeight}
                      </span>
                      <h4 
                        onClick={() => navigate('product-detail', { slug: item.product.slug })}
                        className="font-serif font-bold text-base text-[#2D4628] hover:text-[#D97706] cursor-pointer mt-2 line-clamp-1"
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                        {item.product.tagline}
                      </p>
                      
                      <div className="mt-3 font-serif font-extrabold text-lg text-[#2D4628]">
                        {formatPrice(opt.price)}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full py-2.5 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
