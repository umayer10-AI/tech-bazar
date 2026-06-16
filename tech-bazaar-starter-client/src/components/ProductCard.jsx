import Image from "next/image";

const ProductCard = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
      {products.map((product) => (
        <div
          key={product._id || product.title}
          className="border rounded-lg shadow-sm p-4 bg-white"
        >
          {/* Image */}
          <div className="w-full h-48 relative">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-md"
            />
          </div>

          {/* Content */}
          <div className="mt-3">
            <h2 className="text-lg font-bold">{product.title}</h2>

            <p className="text-sm text-gray-600 mt-1">
              {product.description}
            </p>

            <div className="flex justify-between mt-3">
              <p className="font-semibold text-green-600">
                ${product.price}
              </p>

              <p className="text-sm text-gray-500">
                Qty: {product.quantity}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;