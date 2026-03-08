mkdir -p assets/images/services/modular-kitchen
for i in {1..9}; do curl -sL "https://loremflickr.com/800/600/kitchen,interior?lock=$((i+30))" -o assets/images/services/modular-kitchen/$i.jpg & done

mkdir -p assets/images/services/wardrobes
for i in {1..9}; do curl -sL "https://loremflickr.com/800/600/wardrobe,closet?lock=$((i+30))" -o assets/images/services/wardrobes/$i.jpg & done

mkdir -p assets/images/services/false-ceiling
for i in {1..9}; do curl -sL "https://loremflickr.com/800/600/ceiling,lights?lock=$((i+30))" -o assets/images/services/false-ceiling/$i.jpg & done

mkdir -p assets/images/services/wooden-handrails
for i in {1..9}; do curl -sL "https://loremflickr.com/800/600/staircase,wood?lock=$((i+30))" -o assets/images/services/wooden-handrails/$i.jpg & done

mkdir -p assets/images/services/korean-tile
for i in {1..9}; do curl -sL "https://loremflickr.com/800/600/tiles,kitchen?lock=$((i+30))" -o assets/images/services/korean-tile/$i.jpg & done

mkdir -p assets/images/services/aluminium-partition
for i in {1..9}; do curl -sL "https://loremflickr.com/800/600/office,partition?lock=$((i+30))" -o assets/images/services/aluminium-partition/$i.jpg & done

mkdir -p assets/images/services/elevation-ms
for i in {1..9}; do curl -sL "https://loremflickr.com/800/600/house,elevation?lock=$((i+30))" -o assets/images/services/elevation-ms/$i.jpg & done

mkdir -p assets/images/services/electrical-plumbing
for i in {1..9}; do curl -sL "https://loremflickr.com/800/600/lighting,interior?lock=$((i+30))" -o assets/images/services/electrical-plumbing/$i.jpg & done

mkdir -p assets/images/services/pvc-upvc
for i in {1..9}; do curl -sL "https://loremflickr.com/800/600/windows,modern?lock=$((i+30))" -o assets/images/services/pvc-upvc/$i.jpg & done

wait
echo "All done"
