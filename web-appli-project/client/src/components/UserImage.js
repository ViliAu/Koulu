import { React, useState, useEffect } from 'react';

const UserImage = ({ alt, id, size, className }) => {
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        let mounted = true;
        async function fetchData() {
            try {
                const res = await fetch('/api/image/' + id);
                const imgBlob = await res.blob();
                if (mounted) {
                    setImgSrc(imgBlob && res.ok ? URL.createObjectURL(imgBlob) : '/defaultusericon.png');
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
