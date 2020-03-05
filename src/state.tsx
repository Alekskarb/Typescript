let age: number = 10;
let firstName: string = 'Dimych';
let isMentor: boolean = true;


let ages1: number[] = [18, 12, 19, 22, 45];
let ages11: (number | string)[] = [18, 12, '19', 22, 45];
let ages2: Array<number> = [18, 12, 19, 22, 45];
let ages3: Array<number | string> = [18, 12, '19', 22, 45];
let ages4: Array<number | string | boolean> = [18, 12, '19', true, 45];
//4. Скопируйте этот код и добавьте в него явную типизацию:
// let man1: {name: string, height: number} = { name: 'Dima' , height: 1.78 };
// let man2: {name: string, height: number}  = { name: 'Sasha' , height: 1.8 };
// let car: { model: string, year: number } = {model: 'Reno Stepway', year: 2016};

//5. Для тех же объектов давайте сделаем типизацию, но уже выделив отдельный интерфейсы.

interface IPlanet {
    name: string
    number: number
}

//
type Planet = {
    name: string
    number: number
}
let planet: IPlanet = {name: 'Mars', number: 4};
let planets: Planet = {name: 'upiter', number: 11};


}
let man1: IMan = {name: 'Dima', height: 1.78};
let man2: IMan = {name: 'Sasha', height: 1.8};

let people: Array<IMan> = [
    man1, man1
];

function toUpperCase(strings: Array<string>): Array<string> {
    let result = strings.map(s => s.toUpperCase());
    return result;
}

interface IMan {
    name: string;
    height: number
}
//8. Добавьте строгую типизацию функции, используя те интерфейсы, которые у вас есть:
let createMan = (name: string, height: number): IMan => {
    return {
        name,
        height
    };
};


//9. Расширить интерфейс ICar, чтобы компилятор не ругался:
interface ICar {
    model: string
    year: number
    on: boolean
    turnOn:() => void
    rename:(model:string) => void
}

    let car: ICar = {
        model: 'Reno Stepway' ,
        year: 2016 ,
        on: false ,
        turnOn():void{
            this.on = true ;
        },
        rename(model) {
            this.model = model;
        }
    };

interface IGarage {

    addCar: (car: ICar)=> void
    logAllCarsNames: () => void
    getAllCars: ()=> Array<ICar>
};

let createGarage = (): IGarage => {
    let _cars: Array<ICar> = [];
    return {
        addCar(car) {
            _cars.push(car);
        },
        logAllCarsNames() {
            console .log( 'Cars in the garage: ' );
            _cars.forEach(c => console .log(c.model));
        },
        getAllCars() {
            return _cars;
        }
    }
};


export default 15;