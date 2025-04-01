/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getCurrentUser } from '@/lib/action/auth.action';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DSAInterviewForm() {
    const [userId, setUserId] = useState<string | null>(null);
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('Easy');
    const [amount, setAmount] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser();
            setUserId(user?.id || null);
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!userId) {
            setError("User ID is missing. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/vapi/dsagenerate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, difficulty, amount, userId })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('DSA questions generated successfully!');
                redirect("/")
            } else {
                throw new Error(data.error || 'Failed to generate questions.');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto  bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Generate DSA Interview Questions</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Topic:
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </label>
                <label className="block mb-2 bg-gray-800">
                    Difficulty:
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full border p-2 rounded bg-gray-800"
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </label>
                <label className="block mb-2">
                    Number of Questions:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min="1"
                        className="w-full border p-2 rounded"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-3"
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Questions'}
                </button>
            </form>
        </div>
    );
}
