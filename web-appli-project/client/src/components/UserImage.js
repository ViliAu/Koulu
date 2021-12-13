import { React, useState, useEffect } from 'react';

const UserImage = ({ alt, id, size, className }) => {
    const [imgSrc, setImgSrc] = useState('/defaultusericon.png');

    useEffect(() => {
        let mounted = true;
        async function fetchData() {
            if (!id || id === 'none') {
                return;
            }
            try {
                const res = await fetch('/api/image/' + id);
                const imgBlob = await res.blob();
                if (mounted) {
                    if (imgBlob && res.ok) {
                        setImgSrc(URL.createObjectURL(imgBlob));
                    }
                }
            }
            catch { }
        }
        fetchData();
        return () => {
            mounted = false;
        }
    }, [id]);

    return (
        <div>
            <img
                alt={alt}
                src={imgSrc}
                width={size}
                height={size}
                className={className}
            />
        </div>
    )
}

UserImage.defaultProps = {
    alt: '',
    id: null,
    size: 100,
    className: ''
}

export default UserImage;
