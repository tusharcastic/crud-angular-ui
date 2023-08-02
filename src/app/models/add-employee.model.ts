export class AddEmployee{    
    public constructor(init?: Partial<AddEmployee>) {
        Object.assign(this, init);
    }
    public name: string | undefined;
    public email: string | undefined;
    public phone: string | undefined;
    public salary:number | undefined;
    public department: string | undefined;
}