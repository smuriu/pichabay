'use client';

// import { useSearchParams, useRouter } from "next/navigation";
import { ImageCategories, ImageTypes } from "../lib/pixabay/types";

export default function SearchForm() {
  /* const searchParams = useSearchParams()
  const { replace } = useRouter() */

  return (
    <form className="contents" action="/">
      <div className="join">
        <input className="input input-bordered join-item" placeholder="Search" name="q" />
        <select className="select select-bordered join-item" name="image_type">
          <option disabled selected>Image Type</option>
          {ImageTypes.map((val) => (
            <option key={val} value={val}>{val}</option>
          ))}
        </select>
        <select className="select select-bordered join-item" name="category">
          <option disabled selected>Category</option>
          {ImageCategories.map((val) => (
            <option key={val} value={val}>{val}</option>
          ))}
        </select>
      </div>
      <button className="btn" type="submit">Search</button>
    </form>
  );
}
