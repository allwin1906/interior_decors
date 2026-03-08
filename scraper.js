const https = require('https');
const fs = require('fs');

const searches = {
    'modular-kitchen': 'modular-kitchen',
    'wardrobes': 'wardrobe-closet',
    'false-ceiling': 'ceiling-lights-interior',
    'wooden-handrails': 'wooden-staircase',
    'korean-tile': 'kitchen-tiles',
    'aluminium-partition': 'glass-partition-office',
    'elevation-ms': 'modern-house-exterior',
    'electrical-plumbing': 'modern-bathroom',
    'pvc-upvc': 'modern-windows'
};

Object.entries(searches).forEach(([service, term]) => {
    const dir = `./assets/images/services/${service}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    https.get('https://unsplash.com/s/photos/' + term, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+[^\"]*?(?=\")/g);
            if (matches) {
                const valid = Array.from(new Set(matches)).filter(u => u.includes('w=') && !u.includes('profile')).slice(0, 9);
                console.log(`Downloading ${valid.length} for ${service}`);
                valid.forEach((url, i) => {
                    const finalUrl = url.replace(/&amp;/g, '&');
                    setTimeout(() => {
                        https.get(finalUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
                            if (response.statusCode === 200 || response.statusCode === 302) {
                                // handle redirects natively or just pipe if 200
                                const file = fs.createWriteStream(`${dir}/${i + 1}.jpg`);
                                response.pipe(file);
                            }
                        }).on('error', err => console.error(`Error ${err}`));
                    }, i * 1000);
                });
            }
        });
    }).on('error', err => console.error(err));
});
