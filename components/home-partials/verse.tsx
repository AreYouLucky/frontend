"use client"
import { useEffect, useState } from "react";
type Verse = {
    text: string;
    reference: string;
}
export default function DailyVerse() {
    const [verse, setVerse] = useState<Verse>({ text: "", reference: "" });

    useEffect(() => {
        fetch("https://beta.ourmanna.com/api/v1/get/?format=json")
            .then(res => res.json())
            .then(data => setVerse(data.verse.details));
    }, []);

    if (!verse) return <p>Loading verse...</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-white text-3xl font-bold text-center">Daily Verse</h2>
            <p className="text-white text-xl font-light text-center">{verse.text}</p>
            <p className="text-white tracking-wide text-xl text-end font-semibold">{verse.reference}</p>
        </div>
    );
}