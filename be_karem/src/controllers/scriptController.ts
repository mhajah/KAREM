import { Request, Response } from 'express';
import fs from 'fs';
import { exec } from 'child_process';

export const runScript = (req: Request, res: Response): void => {
    try {
        const { code } = req.body;

        fs.writeFileSync('script.py', code);

        exec('python3 script.py', (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.json({
                stdout: stdout,
                stderr: stderr
            });
        });
    } catch (e: any) {
        console.error('Error running script:', e.message);
        res.status(500).json({ error: e.message });
    }
};
