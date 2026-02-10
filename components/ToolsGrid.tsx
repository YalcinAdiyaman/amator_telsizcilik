"use client";

import { motion, Variants } from "framer-motion";
import DipoleCalculator from "@/components/Calculators/DipoleCalculator";
import SWRCalculator from "@/components/Calculators/SWRCalculator";
import CoaxCalculator from "@/components/Calculators/CoaxCalculator";
import RFSafetyCalculator from "@/components/Calculators/RFSafetyCalculator";
import YagiDesigner from "@/components/Calculators/YagiDesigner";
import BatteryEstimator from "@/components/Calculators/BatteryEstimator";
import InteractiveBandPlan from "@/components/Calculators/InteractiveBandPlan";
import QTHConverter from "@/components/Calculators/QTHConverter";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export default function ToolsGrid() {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* ROW 1: Dipole, SWR, Coax */}
            <motion.div variants={item}>
                <DipoleCalculator />
            </motion.div>

            <motion.div variants={item}>
                <SWRCalculator />
            </motion.div>

            <motion.div variants={item}>
                <CoaxCalculator />
            </motion.div>


            {/* ROW 2: Battery Estimator, QTH Converter, RFSafety */}
            <motion.div variants={item} className="flex flex-col gap-8">
                <BatteryEstimator />
            </motion.div>

            <motion.div variants={item}>
                <QTHConverter />
            </motion.div>

            <motion.div variants={item}>
                <RFSafetyCalculator />
            </motion.div>


            {/* ROW 3: Interactive Band Plan (Full Width) */}
            <motion.div variants={item} className="lg:col-span-3">
                <InteractiveBandPlan />
            </motion.div>


            {/* ROW 4: Yagi Designer (Full Width) */}
            <motion.div variants={item} className="lg:col-span-3">
                <YagiDesigner />
            </motion.div>

        </motion.div>
    );
}
