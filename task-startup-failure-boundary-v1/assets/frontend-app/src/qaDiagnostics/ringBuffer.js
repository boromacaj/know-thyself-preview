/*
 * Bounded history. A QA session can last an hour on a phone; the buffer never grows past `capacity`, and it says how much it had to
 * forget so a reader of the report knows whether the start of the story is missing.
 */
export class RingBuffer {
    capacity;
    items = [];
    forgotten = 0;
    pushed = 0;
    constructor(capacity) {
        this.capacity = capacity;
        if (!Number.isInteger(capacity) || capacity < 1)
            throw new RangeError('RingBuffer capacity must be a positive integer');
    }
    push(item) {
        this.pushed += 1;
        this.items.push(item);
        if (this.items.length > this.capacity) {
            this.items.shift();
            this.forgotten += 1;
        }
    }
    /** Oldest first. A copy: callers cannot grow the buffer through it. */
    toArray() {
        return this.items.slice();
    }
    last(count) {
        return count >= this.items.length ? this.items.slice() : this.items.slice(this.items.length - count);
    }
    get length() {
        return this.items.length;
    }
    /** How many entries were ever pushed, and how many of them were dropped to stay within the capacity. */
    get stats() {
        return { pushed: this.pushed, dropped: this.forgotten, capacity: this.capacity };
    }
    clear() {
        this.items.length = 0;
        this.forgotten = 0;
        this.pushed = 0;
    }
}
