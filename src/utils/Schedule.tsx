import moment from 'moment';
import { deepclone } from '../stories/utils/deepclone';
import { Goal, Time, Level } from './Personalization'
import { MuscleGroupKey, ScheduleTemplateTable, Exercise } from './Datatypes';
import ExercisePicker from './ExercisePicker';

function computeTotalNumOfSets(table: ScheduleTemplateTable): number {
    let n = 0;
    table.rows.forEach((row) => {
        n += row.numOfSets;
    });
    return n * (table.circuits || 1);
}

interface ScheduleTemplate {
    day1?: ScheduleTemplateTable;
    day2?: ScheduleTemplateTable;
    day3?: ScheduleTemplateTable;
    day4?: ScheduleTemplateTable;
    day5?: ScheduleTemplateTable;
    day6?: ScheduleTemplateTable;
    day7?: ScheduleTemplateTable;
}

function generateScheduleTemplate(goal: Goal, time: Time): ScheduleTemplate {
    const isStrength: boolean = goal === Goal.ENDURANCE || goal === Goal.STRENGTH;
    const isAerobic: boolean = goal === Goal.AEROBIC;
    const template: ScheduleTemplate = {};
    if (time === Time.LITTLE && isStrength) {
        const hybridDay: ScheduleTemplateTable = {
            rows: [
                {
                    exercise: MuscleGroupKey.CHEST_TRICEPS_SHOULDERS,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.LEG,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.BACK_BICEPS,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.CORE,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
            ],
            desc: "Hydrid Day",
        }
        template.day1 = deepclone(hybridDay);
        template.day3 = deepclone(hybridDay);
        template.day5 = deepclone(hybridDay);
    } else if (time === Time.LITTLE && isAerobic) {
        const hybridDay: ScheduleTemplateTable = {
            rows: [
                {
                    exercise: MuscleGroupKey.CHEST_TRICEPS_SHOULDERS,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
            ],
            desc: "Hydrid Day",
        }
        const hybridDay2: ScheduleTemplateTable = deepclone(hybridDay);
        hybridDay2.rows[0].exercise = MuscleGroupKey.LEG;

        const hybridDay3: ScheduleTemplateTable = deepclone(hybridDay);
        hybridDay3.rows[0].exercise = MuscleGroupKey.BACK_BICEPS;

        template.day1 = deepclone(hybridDay);
        template.day3 = deepclone(hybridDay2);
        template.day5 = deepclone(hybridDay3);
    } else if (time === Time.SOME) {
        const resistanceDay: ScheduleTemplateTable = {
            rows: [
                {
                    exercise: MuscleGroupKey.CHEST_TRICEPS_SHOULDERS,
                    numOfSets: 3,
                },
                {
                    exercise: MuscleGroupKey.LEG,
                    numOfSets: 3,
                },
                {
                    exercise: MuscleGroupKey.BACK_BICEPS,
                    numOfSets: 3,
                },
                {
                    exercise: MuscleGroupKey.CORE,
                    numOfSets: 1,
                },
            ],
            desc: "Resistance Day",
        }
        const aerobicDay: ScheduleTemplateTable = {
            rows: [
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
            ],
            circuits: 2,
            desc: "Resistance Day",
        }
        const hybridDay: ScheduleTemplateTable = {
            rows: [
                {
                    exercise: MuscleGroupKey.CHEST_TRICEPS_SHOULDERS,
                    numOfSets: 2,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.LEG,
                    numOfSets: 2,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.BACK_BICEPS,
                    numOfSets: 2,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.CORE,
                    numOfSets: 1,
                },
            ],
            circuits: 2,
            desc: "Resistance Day",
        }
        if (isStrength) {
            template.day1 = deepclone(resistanceDay);
            template.day2 = deepclone(aerobicDay);
            template.day4 = deepclone(resistanceDay);
            template.day5 = deepclone(aerobicDay);
        } else if (isAerobic) {
            template.day1 = deepclone(aerobicDay);
            template.day2 = deepclone(aerobicDay);
            template.day4 = deepclone(resistanceDay);
            template.day4 = deepclone(hybridDay);
        }
    } else if (time === Time.A_LOT) {
        const upperBodyDay: ScheduleTemplateTable = {
            rows: [
                {
                    exercise: MuscleGroupKey.CHEST_TRICEPS_SHOULDERS,
                    numOfSets: 3,
                },
                {
                    exercise: MuscleGroupKey.BACK_BICEPS,
                    numOfSets: 3,
                },
                {
                    exercise: MuscleGroupKey.CHEST_TRICEPS_SHOULDERS,
                    numOfSets: 3,
                },
                {
                    exercise: MuscleGroupKey.BACK_BICEPS,
                    numOfSets: 3,
                },
                {
                    exercise: MuscleGroupKey.CHEST_TRICEPS_SHOULDERS,
                    numOfSets: 3,
                },
            ],
            desc: "Upper Body Day",
        }
        const lowerBodyDay: ScheduleTemplateTable = {
            rows: [
                {
                    exercise: MuscleGroupKey.LEG,
                    numOfSets: 3,
                },
                {
                    exercise: MuscleGroupKey.LEG,
                    numOfSets: 3,
                },
                {
                    exercise: MuscleGroupKey.LEG,
                    numOfSets: 3,
                },
                {
                    exercise: MuscleGroupKey.CORE,
                    numOfSets: 3,
                },
                {
                    exercise: MuscleGroupKey.CORE,
                    numOfSets: 3,
                },
            ],
            desc: "Lower Body Day",
        }
        const aerobicDay: ScheduleTemplateTable = {
            rows: [
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
            ],
            circuits: 3,
            desc: "Aerobic Day",
        }
        const hybridDay: ScheduleTemplateTable = {
            rows: [
                {
                    exercise: MuscleGroupKey.CHEST_TRICEPS_SHOULDERS,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.LEG,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.AEROBIC,
                    numOfSets: 1,
                },
                {
                    exercise: MuscleGroupKey.BACK_BICEPS,
                    numOfSets: 1,
                },
            ],
            circuits: 3,
            desc: "Resistance Day",
        }
        if (isStrength) {
            template.day1 = deepclone(upperBodyDay);
            template.day2 = deepclone(lowerBodyDay);
            template.day4 = deepclone(aerobicDay);
            template.day5 = deepclone(aerobicDay);
            template.day6 = deepclone(hybridDay);
        } else if (isAerobic) {
            template.day1 = deepclone(upperBodyDay);
            template.day2 = deepclone(lowerBodyDay);
            template.day4 = deepclone(aerobicDay);
            template.day5 = deepclone(aerobicDay);
            template.day6 = deepclone(aerobicDay);
        }
    }
    if (!template) {
        throw new Error("no template!");
    }

    return template;
}

const secondsPerSet: Map<Level, number> = new Map();
secondsPerSet.set(Level.BEGINNER, 45);
secondsPerSet.set(Level.INTERMEDIATE, 1 * 60);
secondsPerSet.set(Level.ADVANCED, 1.25 * 60);

const secondsPerRest: Map<Level, number> = new Map();
secondsPerRest.set(Level.BEGINNER, 1.25 * 60);
secondsPerRest.set(Level.INTERMEDIATE, 1 * 60);
secondsPerRest.set(Level.ADVANCED, 45);

const repsPerSet: Map<Goal, number> = new Map();
repsPerSet.set(Goal.STRENGTH, 10);
repsPerSet.set(Goal.ENDURANCE, 17);
repsPerSet.set(Goal.AEROBIC, 14);

export interface HumanScheduleRow {
    // Only hour, minute, seconds are valid.
    startTime: Date;
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
}

// U.S. High school shedule format.
export interface HumanSchedule {
    rows: Array<HumanScheduleRow>;
}

// Get muscle group key at current set for the day.
function getMuscleKey(scheduleTemplateTable: ScheduleTemplateTable, setCounter: number): MuscleGroupKey {
    const totalNumOfSets = computeTotalNumOfSets(scheduleTemplateTable);
    const index = setCounter % totalNumOfSets;
    // Find the index.
    let accumlativeNumOfSets: number = 0;
    for (let i = 0; i < scheduleTemplateTable.rows.length; ++i) {
        const row = scheduleTemplateTable.rows[i];
        if (index - accumlativeNumOfSets < row.numOfSets) {
            return row.exercise;
        }
    }
    return MuscleGroupKey.UNSPECIFIED;
}

export function generateHumanSchedule(level: Level, time: Time, goal: Goal): HumanSchedule {
    const setTime: number = secondsPerSet.get(level)!;
    const restTime: number = secondsPerRest.get(level)!;
    const reps: number = repsPerSet.get(goal)!;

    const scheduleTemplate: ScheduleTemplate = generateScheduleTemplate(goal, time);
    // Get the max number of sets
    let maxNumOfSets: number = 0
    if (scheduleTemplate.day1) {
        const numOfSets: number = computeTotalNumOfSets(scheduleTemplate.day1);
        maxNumOfSets = numOfSets > maxNumOfSets ? numOfSets : maxNumOfSets;
    }
    if (scheduleTemplate.day2) {
        const numOfSets: number = computeTotalNumOfSets(scheduleTemplate.day2);
        maxNumOfSets = numOfSets > maxNumOfSets ? numOfSets : maxNumOfSets;
    }
    if (scheduleTemplate.day3) {
        const numOfSets: number = computeTotalNumOfSets(scheduleTemplate.day3);
        maxNumOfSets = numOfSets > maxNumOfSets ? numOfSets : maxNumOfSets;
    }
    if (scheduleTemplate.day4) {
        const numOfSets: number = computeTotalNumOfSets(scheduleTemplate.day4);
        maxNumOfSets = numOfSets > maxNumOfSets ? numOfSets : maxNumOfSets;
    }
    if (scheduleTemplate.day5) {
        const numOfSets: number = computeTotalNumOfSets(scheduleTemplate.day5);
        maxNumOfSets = numOfSets > maxNumOfSets ? numOfSets : maxNumOfSets;
    }
    if (scheduleTemplate.day6) {
        const numOfSets: number = computeTotalNumOfSets(scheduleTemplate.day6);
        maxNumOfSets = numOfSets > maxNumOfSets ? numOfSets : maxNumOfSets;
    }
    if (scheduleTemplate.day7) {
        const numOfSets: number = computeTotalNumOfSets(scheduleTemplate.day7);
        maxNumOfSets = numOfSets > maxNumOfSets ? numOfSets : maxNumOfSets;
    }

    const initialTime = moment("00:00:00", "hh:mm:ss");
    const humanSchedule: HumanSchedule = { rows: [] };
    const exercisePicker = new ExercisePicker();
    for (let setCounter = 0; setCounter < maxNumOfSets; ++setCounter) {
        const curTime = moment(initialTime).add((setTime + restTime) * setCounter, "s");
        const exerciseRow: HumanScheduleRow = {
            startTime: new Date(curTime.valueOf()),
        };
        // Rest time
        const restAt = moment(initialTime).add((setTime + restTime) * setCounter + setTime, "s");
        const restRow: HumanScheduleRow = {
            startTime: new Date(restAt.valueOf()),
        }

        if (scheduleTemplate.day1) {
            // Get muscle group key at current set for the day.
            const muscle: MuscleGroupKey = getMuscleKey(scheduleTemplate.day1, setCounter);
            const exercise: Exercise = exercisePicker.pick(muscle, level);
            exerciseRow.monday = `${reps} reps of ${exercise.name}`
            restRow.monday = `Rest`;
        } 
        
        if (scheduleTemplate.day2) {
            // Get muscle group key at current set for the day.
            const muscle: MuscleGroupKey = getMuscleKey(scheduleTemplate.day2, setCounter);
            const exercise: Exercise = exercisePicker.pick(muscle, level);
            exerciseRow.tuesday = `${reps} reps of ${exercise.name}`
            restRow.tuesday = `Rest`;
        } 
        
        if (scheduleTemplate.day3) {
            // Get muscle group key at current set for the day.
            const muscle: MuscleGroupKey = getMuscleKey(scheduleTemplate.day3, setCounter);
            const exercise: Exercise = exercisePicker.pick(muscle, level);
            exerciseRow.wednesday = `${reps} reps of ${exercise.name}`
            restRow.wednesday = `Rest`;
        }
        
        if (scheduleTemplate.day4) {
            // Get muscle group key at current set for the day.
            const muscle: MuscleGroupKey = getMuscleKey(scheduleTemplate.day4, setCounter);
            const exercise: Exercise = exercisePicker.pick(muscle, level);
            exerciseRow.thursday = `${reps} reps of ${exercise.name}`
            restRow.thursday = `Rest`;
        }
        
        if (scheduleTemplate.day5) {
            // Get muscle group key at current set for the day.
            const muscle: MuscleGroupKey = getMuscleKey(scheduleTemplate.day5, setCounter);
            const exercise: Exercise = exercisePicker.pick(muscle, level);
            exerciseRow.friday = `${reps} reps of ${exercise.name}`
            restRow.friday = `Rest`;
        }
        
        if (scheduleTemplate.day6) {
            // Get muscle group key at current set for the day.
            const muscle: MuscleGroupKey = getMuscleKey(scheduleTemplate.day6, setCounter);
            const exercise: Exercise = exercisePicker.pick(muscle, level);
            exerciseRow.saturday = `${reps} reps of ${exercise.name}`
            restRow.saturday = `Rest`;
        }
        
        if (scheduleTemplate.day7) {
            // Get muscle group key at current set for the day.
            const muscle: MuscleGroupKey = getMuscleKey(scheduleTemplate.day7, setCounter);
            const exercise: Exercise = exercisePicker.pick(muscle, level);
            exerciseRow.sunday = `${reps} reps of ${exercise.name}`
            restRow.sunday = `Rest`;
        }

        humanSchedule.rows.push(exerciseRow);
        humanSchedule.rows.push(restRow);
    }

    return humanSchedule;
}