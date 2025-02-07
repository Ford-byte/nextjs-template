export default function LoadingAnimation({ isLoading }) {
  return (
    <div>
      {isLoading && (
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
      )}
    </div>
  );
}
