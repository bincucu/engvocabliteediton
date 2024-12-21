async function searchWord() {
    const word = document.getElementById('wordInput').value.trim().toLowerCase();
    const languagePair = document.getElementById('languagePair').value;

    if (!word) {
        alert('Please enter a word.');
        return;
    }

    document.getElementById('resultDisplay').innerText = 'Loading...';

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        if (data.title) {
            document.getElementById('resultDisplay').innerText = `Error: ${data.message}`;
        } else {
            document.getElementById('resultDisplay').innerHTML = `
                <pre><b>Word:</b> ${data[0].word}\n
                <b>Definitions:</b> ${data[0].meanings[0].definitions[0].definition || 'No definitions found.'}\n
                <b>Examples:</b> ${data[0].meanings[0].definitions[0].example || 'No examples found.'}\n
                <b>Translation:</b> ${languagePair === 'en-vi' ? await translateToVietnamese(data[0].word) : await translateToEnglish(data[0].word)}</pre>
            `;
        }
    } catch (error) {
        document.getElementById('resultDisplay').innerText = `Error: ${error.message}`;
    }
}

async function translateToVietnamese(word) {
    // Thay thế bằng API dịch thuật thực sự hoặc chức năng tự tạo
    return 'Bản dịch sang Tiếng Việt';
}

async function translateToEnglish(word) {
    // Thay thế bằng API dịch thuật thực sự hoặc chức năng tự tạo
    return 'Translation to English';
}
