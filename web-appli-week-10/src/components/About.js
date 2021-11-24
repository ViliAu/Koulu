import { useState, useEffect } from 'react';
import MyList from './MyList';

function About(props) {
    let [objs, setObjects] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function fetchData() {
            try {
                const req = await fetch('https://jsonplaceholder.typicode.com/posts');
                const items = await req.json();
                let data = [];
                if (mounted) {
                    data = items.map((item) =>
                    <li key={item.id}>
                        {item.title}
                    </li>);
                    setObjects(data);
                }
            }
            catch { }
        }
        fetchData();
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <div>
            <ol>
                {objs}
            </ol>
        </div>
    );
}

export default About;