import { useSelector } from "react-redux";

const ProductView = () => {
  const selectedProduct = useSelector(
    (state) => state?.products?.selectedProduct
  );

  if (!selectedProduct) {
    return <div>No product selected</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6">
      {/* Left Section - Product Image */}
      <div className="w-full md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmluZ3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Product"
          className="rounded-lg w-full"
        />

        {/* Thumbnail Images - Hidden on mobile */}
        <div className="hidden md:flex justify-center gap-2 mt-4 space-x-2">
          {[...Array(3)].map((_, index) => (
            <img
              key={index}
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmluZ3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Thumbnail"
              className="w-16 h-16 rounded-lg cursor-pointer border border-gray-300"
            />
          ))}
        </div>
      </div>

      {/* Right Section - Product Details */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold">{selectedProduct?.name}</h2>

        {/* Ratings */}
        <div className="flex items-center space-x-1 my-2">
          {[...Array(4)].map((_, index) => (
            <span key={index} className="text-yellow-500 text-lg">
              ★
            </span>
          ))}
          <span className="text-gray-400 text-lg">★</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-teal-600">
            ${selectedProduct?.price}
          </span>
          <span className="text-gray-400 line-through">
            ${selectedProduct?.dPrice}
          </span>
        </div>

        {/* Categories */}
        <div className="mt-2">
          <span className="font-semibold">Category: </span>
          <span className="cursor-pointer hover:underline">
            {selectedProduct?.category.toUpperCase()}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-2 text-sm">
          {selectedProduct?.description}
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 text-gray-500">
          {["🔵", "⚫", "⚪", "⚫"].map((icon, index) => (
            <span key={index} className="cursor-pointer">
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
