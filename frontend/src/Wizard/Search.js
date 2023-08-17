const SearchBar = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span class="visually-hidden">Search blog posts</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;