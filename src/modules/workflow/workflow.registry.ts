export enum Status {
    todo,
    blocked,
    proceeding,
    done,
}
export enum TransitionRegistry {
    todo_transition = 'todo_transition',
    blocked_transition = 'blocked_transition',
    proceeding_transition = 'proceeding_transition',
    done_transition = 'done_transition',
}

export class Workflow {
    constructor(init?: Partial<Workflow>) { }
    readonly transitions: { [K in TransitionRegistry]: {
        from: Status[],
        to: Status,
    };
    }
}

export const Registry: { [entity: string]: Workflow } = {}

// definitions
// const ticketWorkflow = new Workflow({
//     transitions: {
//         'blocked_transition': { from: [], Status.done }
//     }
// });
// ticketWorkflow.transitions[Transition.proceeding_transition] = { from: [Status.todo], to: Status.proceeding };
// ticketWorkflow.transitions[Transition.todo_transition] = { from: [Status.blocked], to: Status.todo };
// ticketWorkflow.transitions[Transition.done_transition] = { from: [Status.proceeding], to: Status.done };

// ticketWorkflow.transitions[Transition.done_transition] = { from: [Status.proceeding], to: Status.done };

// Registry[Ticket.name] = ticketWorkflow;

