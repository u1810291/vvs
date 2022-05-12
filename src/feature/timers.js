let interval = 1000;
let expected = Date.now() + interval;
export default function timer() {
    let deltaTimer = Date.now() - expected;
    console.log(deltaTimer)
    if (deltaTimer > interval) {
        // If the browser (tab) was inactive or any other fault.
        console.log('something went wrong');
    }
    expected += interval;
    setTimeout(timer, Math.max(0, interval - deltaTimer));
}
setTimeout(timer, interval);

timer()