class GridData {
    private _row: number;
    private _column: number;
    private _gridType: number;
    private _direction: number;
    private _bodyType:number;

    public get row(): number {
        return this._row;
    }

    public set rows(value: number) {
        this._row = value;
    }

    public get column(): number {
        return this._column;
    }

    public set column(value: number) {
        this._column = value;
    }

    public get gridType(): number {
        return this._gridType;
    }

    public set gridType(value: number) {
        this._gridType = value;
    }

    public get direction(): number {
        return this._direction;
    }

    public set direction(value: number) {
        this._direction = value;
    }

    get bodyType(): number {
        return this._bodyType;
    }

    set bodyType(value: number) {
        this._bodyType = value;
    }
} 