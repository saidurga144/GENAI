type PageHeaderProps = {
    title: string;
    description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{description}</p>
        </div>
    );
}
