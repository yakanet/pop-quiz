
    let currentPage = parseInt(window.location.pathname.match(/P(\d+)\.html/)?.[1] || 0);
    const maxPage = 20; // Adjust this value to your max page number
    
    const jsURL="http://192.168.1.22:5173";
    //const jsURL="https://popquiz.pezenasentransition.org";

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' && currentPage < maxPage) {
            currentPage++;
            window.location.href = `P${currentPage}.html`;
        } else if (event.key === 'ArrowLeft' && currentPage > 0) {
            currentPage--;
            window.location.href = `P${currentPage}.html`;
        }
    });

    function updateImage() {
        const img = document.querySelector('img');
        img.src = `MEDIAS/P${currentPage}.png`;
    }
