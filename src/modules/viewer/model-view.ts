interface translation {
    [s: `trans_${string}`]: string
}

export class ModelView {
    header: { data: { [d: string]: string }, translations: translation }
    signature: { data: { [d: string]: string }, translations: translation }
    subject: { data: { [d: string]: string }, translations: translation }
    table: { data: { [d: string]: string }, translations: translation }
    footer: { data: { [d: string]: string }, translations: translation }
}