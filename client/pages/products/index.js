import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "../../styles/product.module.css";

function Product() {

    const params = useRouter();
    const { id } = params.query;
    const [product, setProduct] = useState();
    const router = useRouter()

    const get_product = async () => {
        const response = await axios.get(`http://localhost:8000/product/get-products/${id}`);
        if (response.status === 200) {
            setProduct(response.data.product);
        } else if (response.data.status === 404) {
            alert(response.data.msg);
        }
    };

    useEffect(() => {
        get_product();
    }, [params]);

    // Handle scrolling for images
    const scrollImages = (direction) => {
        const container = document.getElementById('imageContainer');
        const scrollAmount = container.clientWidth * 1.06;
        container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    };

    const deleteProduct = async()=>{
        await axios.delete(`http://localhost:8000/product/delete-product/${product._id}`)
        .then((res)=>{
            if(res.status === 200){
                router.replace('/')
            }
        })
        .catch((err)=>{
            console.log(err)
            alert("Please try again after some time")
        })
    }

    const editProduct = async()=>{
        router.push({ pathname: '/products/editProduct', query: {id: product._id} })
    }

    return (
        <div className={styles.productPage}>
            <h1 className={styles.productName}>{product?.name}</h1>
            <div className={styles.productDetails}>
                <Image src={product?.thumbnail} alt={product?.name} width={400} height={400} className={styles.thumbnail} />
                <div className={styles.imageGallery}>
                    <button className={styles.scrollButton} onClick={() => scrollImages('left')}>&#8249;</button>
                    
                    <div className={styles.imagesContainer} id="imageContainer">
                        {product?.images?.map((img, index) => (
                          <div key={index} className={styles.imageWrapper}>
                                <Image src={img} alt={`Image ${index}`} width={400} height={300} className={styles.image} />
                            </div>
                        ))}
                    </div> 
                    <button className={styles.scrollButton} onClick={() => scrollImages('right')}>&#8250;</button>
                </div>
            </div> 
            <div className={styles.priceTag}>
              <p>${product?.price}</p>
              {
                product?.review && Array(Number(product?.review)).fill("⭐").map((star,ind)=>(
                  <span key={ind}>{star}</span>
                ))
              }
            </div>
            <div className={styles.productInfo}>
                <p>{product?.description}</p>
                <p><strong>Available</strong> {product?.stock} pieces</p>
                <p><strong>Company:</strong> {product?.company}</p>
            </div>
            <div style={{display: 'flex'}} className={styles.alterBox}>
                <h2 onClick={editProduct}>Edit</h2>
                <h2 style={{marginLeft: 'auto'}} onClick={deleteProduct}>Delete</h2>
            </div>
        </div>
    );
}

export default Product;