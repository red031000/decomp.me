
import Select from "../Select"

import { useCompilersForPlatform } from "./compilers"

export const PRESETS = [
    {
        name: "Super Mario 64",
        compiler: "ido5.3",
        opts: "-O1 -g -mips2",
    },
    {
        name: "Mario Kart 64",
        compiler: "ido5.3",
        opts: "-O2 -mips2",
    },
    {
        name: "Paper Mario",
        compiler: "gcc2.8.1",
        opts: "-O2 -fforce-addr",
    },
    {
        name: "Ocarina of Time",
        compiler: "ido7.1",
        opts: "-O2 -mips2",
    },
    {
        name: "Majora's Mask",
        compiler: "ido7.1",
        opts: "-O2 -g3 -mips2",
    },
    {
        name: "GoldenEye / Perfect Dark",
        compiler: "ido5.3",
        opts: "-Olimit 2000 -mips2 -O2",
    },
    {
        name: "Evo's Space Adventures",
        compiler: "psyq4.6",
        opts: "-O2",
    },
    {
        name: "The Thousand-Year Door",
        compiler: "mwcc_41_60831",
        opts: "-nodefaults -Cpp_exceptions off -RTTI off -fp hard -enc SJIS -lang=c99 -O4 -use_lmw_stmw on -str pool -rostr -inline all -sdata 4 -sdata2 4",
    },
    {
        name: "Pikmin 2",
        compiler: "mwcc_247_108_pikmin2",
        opts: "-nodefaults -Cpp_exceptions off -RTTI off -fp hard -fp_contract on -rostr -O4,p -use_lmw_stmw on -sdata 8 -sdata2 8 -msgstyle gcc",
    },
    {
        name: "Battle for Bikini Bottom",
        compiler: "mwcc_247_92",
        opts: "-g -Cpp_exceptions off -RTTI off -fp hard -fp_contract on -O4,p -msgstyle gcc -maxerrors 1 -str reuse,pool,readonly -char unsigned -enum int -use_lmw_stmw on -inline off",
    },
    {
        name: "Super Monkey Ball",
        compiler: "mwcc_233_159",
        opts: "-Cpp_exceptions off -nodefaults -O4,p -fp fmadd -fp_contract on -enum int",
    },
    {
        name: "Twilight Princess",
        compiler: "mwcc_247_108_tp",
        opts: "-Cpp_exceptions off -nodefaults -O3 -fp hard -msgstyle gcc -str pool,readonly,reuse -RTTI off -maxerrors 1 -enum int",
    },
]

export default function PresetSelect({ className, platform, compiler, opts, setCompiler, setOpts, serverCompilers }: {
    className?: string
    platform: string
    compiler: string
    opts: string
    setCompiler: (compiler: string) => void
    setOpts: (opts: string) => void
    serverCompilers?: Record<string, { platform: string | null }>
}) {
    const compilers = useCompilersForPlatform(platform, serverCompilers)

    const presets = PRESETS.filter(p => compilers?.find(c => c.id === p.compiler) !== undefined)
    const selectedPreset = PRESETS.find(p => p.compiler === compiler && p.opts === opts)

    return <Select className={className} onChange={e => {
        if ((e.target as HTMLSelectElement).value === "custom") {
            return
        }

        const preset = presets.find(p => p.name === (e.target as HTMLSelectElement).value)

        setOpts(preset.opts)
        setCompiler(preset.compiler)
    }}>
        {!selectedPreset && <option value="custom" selected>Custom</option>}
        {presets.map(preset =>
            <option key={preset.name} value={preset.name} selected={preset === selectedPreset}>
                {preset.name}
            </option>
        )}
    </Select>
}
