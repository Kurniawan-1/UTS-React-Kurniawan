import Button from "./Button";

export default function Product({ id, name, image, price, category, setEditedProduct }) {
    return (
        <div className="product">
            <img src={image} alt={name} />
            <section>
                <h2>({id}) {name}</h2>
                <p>
                    {price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                    })} ({category})
                </p>
                <div>
                    <Button
                        variant="tonal"
                        onClick={() =>
                            setEditedProduct({
                                id,
                                name,
                                image,
                                price,
                                category,
                            })
                        }
                    >
                        Edit
                    </Button>
                    <Button>Beli</Button>
                </div>
            </section>
        </div>
    );
}
