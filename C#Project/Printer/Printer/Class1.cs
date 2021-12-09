using System;
using System.Drawing.Printing;
using System.Threading.Tasks;

namespace Win
{
    public class Printer
    {
        PrintDocument pd = new PrintDocument();
        public async Task<Object> getPrinters(object input)
        {
            return PrinterSettings.InstalledPrinters;
        }

        public async Task<Object> getPaperSizes(object printerName)
        {
            pd.PrinterSettings.PrinterName = printerName.ToString();
            return pd.PrinterSettings.PaperSizes;
        }

        public async Task<Object> getTrays(object printerName)
        {
            pd.PrinterSettings.PrinterName = printerName.ToString();
            return pd.PrinterSettings.PaperSources;
        }

    }
}
