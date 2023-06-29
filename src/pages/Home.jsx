import { useState } from "react";
import Product from "../components/Product";
import Button from "../components/Button";
import { AiOutlinePlus } from 'react-icons/ai';

export default function Home() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "MacBook Air 15”",
            image: "macbook_air_15.jpg",
            price: 26999999,
            category: "Laptop",
        },
        {
            id: 2,
            name: "iPhone 14 Pro",
            image: "iphone_14_pro.jpg",
            price: 19999999,
            category: "Smartphone",
        },
        {
            id: 3,
            name: "iPhone 14",
            image: "iphone_14.jpg",
            price: 15999999,
            category: "Smartphone",
        },
        {
            id: 4,
            name: "Apple Vision Pro",
            image: "apple_vision_pro.jpg",
            price: 66999999,
            category: "Headset",
        },
        {
            id: 5,
            name: "MacBook Air 15”",
            image: "macbook_air_15.jpg",
            price: 26999999,
            category: "Laptop",
        },
        {
            id: 6,
            name: "iPhone 14 Pro",
            image: "iphone_14_pro.jpg",
            price: 19999999,
            category: "Smartphone",
        },
        {
            id: 7,
            name: "iPhone 14",
            image: "iphone_14.jpg",
            price: 15999999,
            category: "Smartphone",
        },
        {
            id: 8,
            name: "Apple Vision Pro",
            image: "apple_vision_pro.jpg",
            price: 66999999,
            category: "Headset",
        },
        {
            id: 9,
            name: "MacBook Air 15”",
            image: "macbook_air_15.jpg",
            price: 26999999,
            category: "Laptop",
        },
        {
            id: 10,
            name: "iPhone 14 Pro",
            image: "iphone_14_pro.jpg",
            price: 19999999,
            category: "Smartphone",
        },
        {
            id: 11,
            name: "iPhone 14",
            image: "iphone_14.jpg",
            price: 15999999,
            category: "Smartphone",
        },
        {
            id: 12,
            name: "Apple Vision Pro",
            image: "apple_vision_pro.jpg",
            price: 66999999,
            category: "Headset",
        },
    ]);
    const [keyword, setKeyword] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [page, setPage] = useState(1);
    const [editedProduct, setEditedProduct] = useState();
    const [idSquence, setIdSequence] = useState(products.length);
    const [newProduct, setNewProduct] = useState();
    const [sortByCategory, setSortByCategory] = useState();

    const filteredSortedProducts = products
        .toSorted((a, b) => {
            if (sortOrder === "asc") {
                return a[sortBy] < b[sortBy] ? -1 : 1;
            } else {
                return a[sortBy] > b[sortBy] ? -1 : 1;
            }
        })
        .filter(
            (product) =>
                product.name.toLowerCase().includes(keyword) &&
                product.price >= minPrice &&
                product.price <= maxPrice
        );

    const handleSortByCategory = () => {
        const sorted = [...products].sort((a, b) => a.category.localeCompare(b.category));
        setSortByCategory(sorted);
    };

    return (
        <div className="products">
            <header>
                <Button onClick={() => setNewProduct({ id: idSquence })}> <AiOutlinePlus /> Buat</Button>
                <label>
                    Cari:
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </label>
                <section>
                    Harga:
                    <label>
                        Minimal:
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </label>
                    <label>
                        Maksimal:
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value || Infinity)}
                        />
                    </label>
                    <label>
                        Kategori
                        <select value={sortByCategory} onChange={(e) => setSortByCategory(e.target.value)}>
                            <option value="headset">Headset</option>
                            <option value="laptop">Laptop</option>
                            <option value="smartphone">Smartphone</option>
                            <option value="watch">Watch</option>
                        </select>
                    </label>
                </section>
                <section>
                    Urutkan:
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="id">Normal</option>
                        <option value="name">Nama</option>
                        <option value="price">Harga</option>
                    </select>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Naik</option>
                        <option value="desc">Turun</option>
                    </select>
                </section>
            </header>
            <main>
                {filteredSortedProducts.length > 0
                    ? filteredSortedProducts
                        .filter((_product, i) => i >= 4 * page - 4 && i < 4 * page)
                        .map((product) => (
                            <Product
                                key={product.id}
                                {...product}
                                setEditedProduct={setEditedProduct}
                            />
                        ))
                    : "Tidak ada produk ditemukan."}
            </main>
            <footer>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Sebelumnya
                </Button>
                {filteredSortedProducts
                    .filter((_product, i) => i % 4 === 0)
                    .map((_product, i) => (
                        <button
                            key={i}
                            className="page-number"
                            onClick={() => setPage(i + 1)}
                            disabled={i + 1 === page}
                        >
                            {i + 1}
                        </button>
                    ))}
                <Button
                    onClick={() => setPage(page + 1)}
                    disabled={page === Math.ceil(filteredSortedProducts.length / 4)}
                >
                    Berikutnya
                </Button>
            </footer>
            {newProduct && (
                <form
                    className="dialog"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setProducts([...products, newProduct]);
                        setNewProduct();
                        setIdSequence(idSquence + 1);
                    }}
                >
                    <h1>Buat Produk</h1>
                    {/* <label>
                        ID
                        <input type="text" value={newProduct.id} readOnly />
                    </label> */}
                    <label>
                        Nama
                        <input
                            type="text"
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, name: e.target.value })
                            }
                            required
                            autoFocus
                        />
                    </label>
                    <label>
                        Harga
                        <input
                            type="number"
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, price: e.target.value })
                            }
                            required
                        />
                    </label>
                    <label>
                        Gambar
                        <input
                            type="text"
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, image: e.target.value })
                            }
                            required
                            autoFocus
                        />
                    </label>
                    <label>
                        Kategori
                        <select onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                            <option value="headset">Headset</option>
                            <option value="laptop">Laptop</option>
                            <option value="smartphone">Smartphone</option>
                            <option value="watch">Watch</option>
                        </select>
                    </label>
                    <div>
                        <Button
                            type="reset"
                            variant="tonal"
                            onClick={() => setNewProduct()}>Batal</Button>
                        <Button>Simpan</Button>
                    </div>
                </form>
            )}
            {editedProduct && (
                <form
                    className="dialog"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setProducts(
                            products.map((product) =>
                                product.id === editedProduct.id ? editedProduct : product
                            )
                        );
                        setEditedProduct(undefined);
                    }}
                >
                    <h1>Edit Produk</h1>
                    <label>
                        Nama
                        <input
                            type="text"
                            value={editedProduct.name}
                            onChange={(e) =>
                                setEditedProduct({ ...editedProduct, name: e.target.value })
                            }
                            autoFocus
                        />
                    </label>
                    <label>
                        Harga
                        <input
                            type="number"
                            value={editedProduct.price}
                            onChange={(e) =>
                                setEditedProduct({
                                    ...editedProduct,
                                    price: parseInt(e.target.value),
                                })
                            }
                        />
                    </label>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            type="reset"
                            variant="tonal"
                            onClick={() => setEditedProduct(undefined)}
                        >
                            Batal
                        </Button>
                        <Button>Simpan</Button>
                    </div>
                </form>
            )}
        </div>
    );
}
