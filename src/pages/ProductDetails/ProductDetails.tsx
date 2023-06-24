import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../store/typesProduct';
import { IComment } from '../../store/typesComments';
const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/cards/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));

    fetch(`http://localhost:3001/comments?productId=${id}`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [id]);

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCommentData = {
      productId: id,
      description: newComment,
      date: new Date().toLocaleString(),
    };

    fetch('http://localhost:3001/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCommentData),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewComment('');
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Count: {product.count}</p>
      <p>
        Size: {product.size.width} x {product.size.height}
      </p>
      <p>Weight: {product.weight}</p>

      <div className="mt-8">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment: IComment) => (
            <li key={comment.id} className="border p-4 rounded-lg">
              <p className="font-bold">Description: {comment.description}</p>
              <p>Date: {comment.date}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit} className="mt-8">
          <label htmlFor="comment" className="block">
            Add Comment:
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
