import { useState } from "react";

type GigData = {
    title: string;
    description: string;
    price: string;
    category: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function GigModal({ isOpen, onClose }: Props) {
    const [gigData, setGigData] = useState<GigData>({
        title: "",
        description: "",
        price: "",
        category: "",
    });

    const handleSubmitGig = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/gigs/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    workerId: 1, // later dynamic
                    ...gigData,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Something went wrong");
                return;
            }

            alert(data.message);
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px]">
                <h2 className="text-lg font-bold mb-4">Create Gig</h2>

                <input
                    type="text"
                    placeholder="Title"
                    className="w-full border p-2 mb-3 rounded"
                    onChange={(e) =>
                        setGigData({ ...gigData, title: e.target.value })
                    }
                />

                <textarea
                    placeholder="Description"
                    className="w-full border p-2 mb-3 rounded"
                    onChange={(e) =>
                        setGigData({ ...gigData, description: e.target.value })
                    }
                />

                <input
                    type="number"
                    placeholder="Price"
                    className="w-full border p-2 mb-3 rounded"
                    onChange={(e) =>
                        setGigData({ ...gigData, price: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Category"
                    className="w-full border p-2 mb-3 rounded"
                    onChange={(e) =>
                        setGigData({ ...gigData, category: e.target.value })
                    }
                />

                <div className="flex justify-end gap-2 mt-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmitGig}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}