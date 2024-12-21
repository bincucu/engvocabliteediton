async function searchWord() {
    const word = document.getElementById('wordInput').value.trim().toLowerCase();
    const languagePair = document.getElementById('languagePair').value;

    if (!word) {
        alert('Please enter a word.');
        return;
    }

    document.getElementById('resultDisplay').innerText = 'Loading...';

    try {
        const response = await fetch(`https://urban-dictionary-lookup.p.rapidapi.com/define/${word}`, {
            headers: {
                'X-RapidAPI-Key': 'YOUR_API_KEY',
                'X-RapidAPI-Host': 'urban-dictionary-lookup.p.rapidapi.com'
            }
        });
        const data = await response.json();
        if (data.title) {
            document.getElementById('resultDisplay').innerText = `Error: ${data.message}`;
        } else {
            const translation = languagePair === 'en-vi' ? await translateToVietnamese(word) : await translateToEnglish(word);
            const meanings = data.list.map(item => `
                <b>Definition:</b> ${item.definition}\n
                <b>Example:</b> ${item.example}\n
                <b>Upvotes:</b> ${item.thumbs_up}\n
                <b>Downvotes:</b> ${item.thumbs_down}\n
            `).join('\n\n');
            document.getElementById('resultDisplay').innerHTML = `
                <pre><b>Word:</b> ${word}\n
                ${meanings}\n
                <b>Translation:</b> ${translation}</pre>
            `;
        }
    } catch (error) {
        document.getElementById('resultDisplay').innerText = `Error: ${error.message}`;
    }
}

async function translateToVietnamese(word) {
    // Replace with a real translation API or function
    return 'Bản dịch sang Tiếng Việt';
}

async function translateToEnglish(word) {
    // Replace with a real translation API or function
    return 'Translation to English';
}
