import React, {useState} from "react";

export interface Seat {
  id: string;
  row: number;
  column: number;
  active: boolean;
}

interface SeatsMapProps {
  rows: number;
  columns: number;
  seats: Seat[];
}

export const SeatsMap: React.FC<SeatsMapProps> = ({ rows, columns, seats: initialSeats }) => {
  const [mapSeats, setMapSeats] = useState<Seat[]>(initialSeats);
  const [showForm, setShowForm] = useState(false);
  const [newSeat, setNewSeat] = useState<{ id: string; row: number; column: number; active: boolean; statusNote: string }>({
    id: "",
    row: 1,
    column: 1,
    active: true,
    statusNote: ""
  });

  const seatMap = new Map<string, Seat>();
  mapSeats.forEach((seat) => {
    seatMap.set(`${seat.row}-${seat.column}`, seat);
  });

  const cells = [];
  for (let row = 1; row <= rows; row++) {
    for (let column = 1; column <= columns; column++) {
      const seat = seatMap.get(`${row}-${column}`);
      const isActive = seat ? seat.active : false;
      cells.push(
        <div
          key={`${row}-${column}`}
          className={`h-10 w-10 border flex items-center justify-center ${
            isActive ? "bg-green-500" : "bg-gray-200"
          }`}
        >
          {seat ? seat.id : ""}
        </div>
      );
    }
  }

  return (
    <div className="flex space-x-4">
      <div className="w-1/3 p-4 border">
        <button onClick={() => setShowForm(!showForm)} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
          Add Simulator
        </button>
        {showForm && (
          <form onSubmit={e => {
            e.preventDefault();
            let nextRow = 1;
            let nextCol = 1;
            const taken = new Set(mapSeats.map(s => `${s.row}-${s.column}`));
            outer: for (let r = 1; r <= rows; r++) {
              for (let c = 1; c <= columns; c++) {
                if (!taken.has(`${r}-${c}`)) {
                  nextRow = r;
                  nextCol = c;
                  break outer;
                }
              }
            }
            setMapSeats([...mapSeats, { ...newSeat, row: nextRow, column: nextCol }]);
            setShowForm(false);
          }}>
            <div className="space-y-2">
              <label>
                ID:
                <input type="text" value={newSeat.id} onChange={e => setNewSeat(prev => ({ ...prev, id: e.target.value }))} className="block border rounded px-2 py-1" required />
              </label>
              <label>
                Active:
                <input type="checkbox" checked={newSeat.active} onChange={e => setNewSeat(prev => ({ ...prev, active: e.target.checked }))} className="ml-2" />
              </label>
              <label>
                Status Note:
                <input type="text" value={newSeat.statusNote} onChange={e => setNewSeat(prev => ({ ...prev, statusNote: e.target.value }))} className="block border rounded px-2 py-1" />
              </label>
              <button type="submit" className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Save</button>
            </div>
          </form>
        )}
      </div>
      <div className="flex-1">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: "4px",
          }}
        >
          {cells}
        </div>
      </div>
    </div>
  );
};
