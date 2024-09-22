import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from "../../styles/edit.module.css";
import Image from 'next/image';
import { storage } from "../../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

function EditProduct() {
    const params = useRouter();
    const { id } = params.query;
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [screenLoading,setScreenLoading] = useState(false)

    const router = useRouter()
    

    const get_product = async () => {
        setScreenLoading(true)
        const response = await axios.get(`https://mindtide.onrender.com/product/get-products/${id}`);
        if (response.status === 200) {
            const productData = response.data.product;
            console.log("DATA = ",productData)
            setImages(response.data.images);
            setThumbnail(response.data.thumbnail);
            setProduct(productData);
            setScreenLoading(false)
        } else if (response.data.status === 404) {
            alert(response.data.msg);
        }
    };

    useEffect(() => {
        get_product();
    },[params]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const uploadMultiplePhotos = (files) => {
        if (files.length === 0) alert("Upload product images");
        setLoading(true);
        setImages([]);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            uploadPhotos(file).then((link) => {
                setImages((prev) => [...prev,link]);
            });
        }
        setLoading(false);
    };

    const uploadThumbnail = (image) => {
        if (!image) return alert("Upload thumbnail image");
        setLoading(true);
        uploadPhotos(image).then((link) => {
            setThumbnail(link);
        });
        setLoading(false);
    };

    const uploadPhotos = (image) => {
        return new Promise((resolve, reject) => {
            const imgRef = ref(storage, `/MindTide/${Date.now()}`);
            uploadBytes(imgRef, image)
                .then((res) => {
                    getDownloadURL(res.ref)
                        .then((link) => {
                            resolve(link);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const SaveChanges = async() => {
        setLoading(true)
        await axios.put(`https://mindtide.onrender.com/product/update-product/${product._id}`,{
            ...product,
            thumbnail,
            images,
        })
        .then((res)=>{
            if(res.status === 200)
            {
                setLoading(false)
                router.replace('/')
            }
        })
        .catch((err)=>{
            alert("Please Try Again")
        })
    };

    return (
        <div>
            <div className={styles.productPage}>
                {screenLoading && <h2>Loading......</h2>}
                {product && <>
                    <input 
                        className={styles.productName} 
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                    />
                    <div className={styles.productDetails}>
                        {thumbnail && <Image src={thumbnail} alt="Thumbnail" width={100} height={100} />}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Thumbnail</label>
                            <input
                                type="file"
                                name="thumbnail"
                                onChange={(e) => uploadThumbnail(e.target.files[0])}
                                className={styles.input}
                                accept="image/*"
                            />
                        </div>
                        <div className={styles.imagePreview}>
                            {images.map((img, index) => (
                                <Image key={index} src={img} alt={`Product Image ${index}`} width={100} height={100} />
                            ))}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Product Images</label>
                            <input
                                type="file"
                                name="images"
                                multiple
                                onChange={(e) => uploadMultiplePhotos(e.target.files)}
                                className={styles.input}
                                accept="image/*"
                            />
                        </div>
                    </div> 
                    <div className={styles.priceTag}>
                        <strong>Price</strong>
                        <input 
                            name="price" 
                            value={product.price} 
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                        <strong>Review</strong>
                        <input 
                            name="review" 
                            value={product.review} 
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.productInfo}>
                        <textarea 
                            className={styles.input} 
                            name="description" 
                            value={product.description} 
                            onChange={handleInputChange}
                        />
                        <strong>Available Pieces</strong>
                        <input 
                            name="stock" 
                            value={product.stock} 
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                        <strong>Company</strong>
                        <input 
                            name="company" 
                            value={product.company} 
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <button className={styles.productPageButton} onClick={SaveChanges} disabled={loading}>
                            {loading ? 'Loading...' : 'Save Changes'}
                        </button>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default EditProduct;