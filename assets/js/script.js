document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news-list");

    // Fetch news data from the `news` directory
    const fetchNews = async () => {
        try {
            const response = await fetch("./news/");
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");

            // Extract markdown files
            const newsLinks = [...doc.querySelectorAll("a")]
                .map((link) => link.href)
                .filter((url) => url.endsWith(".md"));

            // Render news articles
            newsLinks.forEach((newsUrl) => {
                const newsTitle = decodeURIComponent(
                    newsUrl.split("/").pop().replace(/_/g, " ").replace(".md", "")
                );
                const newsHTML = `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">${newsTitle}</h5>
                                <a href="${newsUrl}" class="btn btn-primary btn-sm">Read More</a>
                            </div>
                        </div>
                    </div>`;
                newsContainer.innerHTML += newsHTML;
            });
        } catch (error) {
            console.error("Failed to fetch news:", error);
            newsContainer.innerHTML = "<p>Error loading news articles.</p>";
        }
    };

    fetchNews();
});
