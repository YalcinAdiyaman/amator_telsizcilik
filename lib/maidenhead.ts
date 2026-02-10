export class Maidenhead {
    static toLocator(lat: number, lon: number): string {
        const y = lat + 90.0;
        const x = lon + 180.0;

        const A = Math.floor(x / 20);
        const B = Math.floor(y / 10);

        const rA = x % 20;
        const rB = y % 10;

        const C = Math.floor(rA / 2);
        const D = Math.floor(rB);

        const rC = rA % 2;
        const rD = rB % 1;

        const E = Math.floor(rC * 12);
        const F = Math.floor(rD * 24);

        return (
            String.fromCharCode(A + 65) +
            String.fromCharCode(B + 65) +
            String(C) +
            String(D) +
            String.fromCharCode(E + 97) +
            String.fromCharCode(F + 97)
        );
    }

    static fromLocator(locator: string): [number, number] {
        // simplified decoding logic if needed
        // Assuming standard 6 char format
        if (!locator || locator.length < 2) return [0, 0];

        const u = locator.toUpperCase();
        const lonField = u.charCodeAt(0) - 65;
        const latField = u.charCodeAt(1) - 65;

        let lon = lonField * 20 - 180;
        let lat = latField * 10 - 90;

        if (locator.length >= 4) {
            const lonSquare = parseInt(u[2]);
            const latSquare = parseInt(u[3]);
            lon += lonSquare * 2;
            lat += latSquare;
        }

        if (locator.length >= 6) {
            const lonSub = u.charCodeAt(4) - 65; // 'a' became 'A' via upper
            const latSub = u.charCodeAt(5) - 65;
            lon += lonSub / 12;
            lat += latSub / 24;
        }

        // Center of square
        // For now returning bottom-left which is standard for grid calculation base
        return [lat, lon];
    }
}
