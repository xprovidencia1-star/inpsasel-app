async function test() {
    try {
        const res = await fetch("https://text.pollinations.ai/Hola%20como%20estas");
        const text = await res.text();
        console.log("AI Response:", text);
    } catch (e) {
        console.error(e);
    }
}
test();
