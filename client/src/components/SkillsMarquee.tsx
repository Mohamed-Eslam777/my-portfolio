import { MARQUEE_SKILLS } from "@/lib/data";

export function SkillsMarquee() {
    // Duplicate the skills array to create seamless infinite loop
    const duplicatedSkills = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black py-12 border-y border-yellow-500/20">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

            {/* Scrolling container */}
            <div className="flex gap-12 animate-marquee hover:pause-marquee">
                {duplicatedSkills.map((skill, index) => (
                    <div
                        key={`${skill.name}-${index}`}
                        className="flex flex-col items-center justify-center min-w-[120px] group cursor-pointer"
                    >
                        {/* Icon container with hover effect */}
                        <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 group-hover:border-yellow-500/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-yellow-500/20">
                            {typeof skill.icon === 'string' ? (
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                                    loading="lazy"
                                />
                            ) : (
                                <skill.icon className="w-full h-full text-gray-300 group-hover:text-yellow-500 transition-colors duration-300" />
                            )}
                        </div>

                        {/* Skill name */}
                        <span className="text-sm font-medium text-gray-300 group-hover:text-yellow-500 transition-colors duration-300 text-center whitespace-nowrap">
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
